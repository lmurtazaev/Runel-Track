# Интеграция с API сервисов

Общий процесс разработки и публикации смотри в [онлайн-гайде](https://yandex.ru/support/tracker/ru/plugins/quickstart). Сигнатуры и доступность операций всегда сверяй с локальной документацией и типами установленных пакетов.

## Сначала выбери готовый API-клиент

Для сервисов платформы используй готовый типизированный клиент через bridge хоста. Он знает контракт API, не требует вручную задавать upstream URL и не использует `permissions.external`.

| Сервис               | Клиент         | Пакеты текущего канала                                                 |
| -------------------- | -------------- | ---------------------------------------------------------------------- |
| Tracker              | `trackerApi`   | `@weavix/tracker-plugin-sdk`                                             |
| Wiki                 | `wikiApi`      | `@weavix/wiki-api-plugin` + `@weavix/wiki-api-types`           |
| Forms                | `formsApi`     | `@weavix/forms-api-plugin` + `@weavix/forms-api-types`         |
| Calendar, Mail, Disk | `yandex360Api` | `@weavix/yandex360-api-plugin` + `@weavix/yandex360-api-types` |

Выбирай пакеты того же канала, что и SDK проекта. В starter целевого сервиса нужный клиент может быть уже установлен; отсутствующие plugin- и types-пакеты добавляй как прямые dependencies командой `npm install <plugin-package> <types-package>`. Затем импортируй соответствующий singleton и выбирай endpoint по автодополнению:

```typescript
import { wikiApi } from '@weavix/wiki-api-plugin';

const { data: page } = await wikiApi.v1.get['/pages/{idx}']({
  pathParams: { idx: 42 },
});
```

Для `trackerApi` пути смотри в установленном Tracker SDK/API Types. Для остальных клиентов источник правды — `dist/api-paths.d.ts` соответствующего types-пакета: готовые клиенты могут поддерживать только часть API сервиса. Хост продукта должен зарегистрировать bridge handler клиента (`api.tracker.call`, `api.wiki.call`, `api.forms.call` или `api.yandex360.call`); iframe-плагин не настраивает base URL и не хранит service credentials.

Строка Calendar, Mail, Disk обозначает штатную интеграционную точку Yandex 360, а не обещание полного покрытия всех трёх API. Вызывай только операции из установленного `yandex360-api-types/dist/api-paths.d.ts`; если нужного Calendar или Mail endpoint там нет, он не считается доступным через типизированный клиент этой версии.

Готовый клиент не использует `permissions.external`, но хост всё равно может проверять service scopes из `permissions.data`. Добавляй только scopes, которые требует выбранная операция и допускает установленный `manifest.schema.json`.

Переходи к generic proxy ниже только для стороннего сервиса или endpoint, которого нет в готовом types-пакете и bridge-контракте целевого хоста.

## Generic proxy для остальных HTTP API

Подключи внешний API через разрешение `permissions.external` и proxy хоста. Для авторизованного API не вызывай `fetch` напрямую: хост сам хранит credentials, добавляет authorization header и выполняет запрос через `hostApi.externalApiCall()`.

### 1. Объяви домен и авторизацию

Добавь в `manifest.json` hostname без протокола и пути:

```json
{
  "permissions": {
    "external": [
      {
        "domain": "api.example.com",
        "access": ["proxy"],
        "authorization": {
          "type": "oauth",
          "scopes": ["items:read"],
          "contextTypes": ["user"]
        }
      }
    ]
  }
}
```

- `access: ["proxy"]` разрешает вызовы через хост. Указывай его явно для API с credentials.
- `access: ["direct"]` подходит только для публичного API, доступного из iframe по CORS и CSP. Для `hostApi.externalApiCall()` требуется `proxy`; при необходимости разрешены оба значения.
- `authorization.type: "oauth"` используй для OAuth или ручного PAT OAuth-провайдера; перечисли минимальные `scopes`.
- `authorization.type: "token"` используй для API key. Поля `header` и `prefix` задают схему заголовка: по умолчанию это `Authorization: Bearer <token>`, а пустой `prefix` убирает префикс.
- `contextTypes` определяет контекст credentials. В текущей схеме шаблона поддерживается `user`; перед использованием другого значения проверь установленный `manifest.schema.json`.
- Если API не требует авторизации, не добавляй `authorization` и пропусти шаг запроса credentials.

Для ручного токена можно добавить локализованные `instructions` рядом с `authorization`; хост покажет их пользователю в своём диалоге.

### 2. Запроси авторизацию и вызови API

```typescript
import { EXTERNAL_API_CALL_ERROR, PluginActionError, hostApi } from '@weavix/tracker-plugin-sdk';

export async function loadItems() {
  const auth = await hostApi.externalApiAuthCheckAndRequest({
    domains: ['api.example.com'],
    contextType: 'user',
  });

  if (!auth.success) {
    return { kind: 'cancelled' as const };
  }

  try {
    const response = await hostApi.externalApiCall({
      url: 'https://api.example.com/v1/items',
      method: 'GET',
      headers: { Accept: 'application/json' },
      contextType: 'user',
      timeoutMs: 10_000,
    });

    if (response.status < 200 || response.status >= 300) {
      return { kind: 'http-error' as const, status: response.status };
    }

    return { kind: 'success' as const, data: response.body };
  } catch (error) {
    if (error instanceof PluginActionError && error.code === EXTERNAL_API_CALL_ERROR) {
      return { kind: 'proxy-error' as const, details: error.errorData };
    }
    throw error;
  }
}
```

`externalApiAuthCheckAndRequest()` проверяет credentials и при необходимости открывает UI хоста. `success: false` означает, что пользователь не завершил авторизацию. `externalApiCall()` возвращает HTTP status upstream API; проверяй non-2xx отдельно. Ошибки policy, bridge и proxy приходят как `PluginActionError` с кодом `EXTERNAL_API_CALL_ERROR`.

Не передавай `Authorization`, cookie или API-key header вручную: хост отклоняет credential headers и подставляет их из защищённого хранилища. Не сохраняй и не копируй токены в исходный код, `localStorage`, `sessionStorage` или `storageApi`, не выводи их в лог. Плагин должен работать только с результатом авторизации и ответом proxy.

Полные сигнатуры базового bridge API сверяй с `node_modules/@weavix/tracker-plugin-sdk/README.md`, а разрешения — с установленным `manifest.schema.json`.
