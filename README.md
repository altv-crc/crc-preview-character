# [CRC][TS] Preview Character

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

Spawn a pedestrian preview of a character based on the `Appearance` interface.

<img src="https://i.imgur.com/XV7ZBam.png" width="250" />
 
## Installation

1. Create a folder in your `src` folder called `crc-preview-character`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-preview-character`.

```
resources = [ 
    'crc-db',
    'crc-native-menu',
    'crc-instructional-buttons',
    'crc-discord-login',
    'crc-preview-character'
    'watch-resources'
]
```

_Your resource structure may vary_

## Developers

When you create a ped preview you also have to supply a position for the pedestrian to be spawned at.


### Server Events

#### crc-appearance-apply

Emit this when you want to create a ped, and apply appearance to that ped.

```ts
alt.emit('crc-preview-character-update', someAppearanceData, somePosition);
```

#### crc-appearance-updated

Listen to this event to see when a peds appearance has been changed

```ts
alt.on('crc-preview-character-updated', (somePed) => {});
```

### Client Events

#### crc-preview-character-destroy

Emit this when you want to destroy the created ped.

```ts
alt.emit('crc-preview-character-destroy');
```

#### crc-preview-character-destroyed

Listen to this even when you want to know when the preview was destroyed

```ts
alt.on('crc-preview-character-destroyed', () => {});
```