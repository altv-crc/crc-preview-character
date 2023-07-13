import * as shared from 'alt-shared';

declare module 'alt-client' {
    interface ICustomEmitEvent {
        /**
         * Call this function to show a ped & update with appearance.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-preview-character-update': (appearance: shared.Appearance, pos: shared.Vector3) => void;

        /**
         * Listen to this function when you want to know `when` a ped has finished updating with appearance data
         *
         * @memberof ICustomEmitEvent
         */
        'crc-preview-character-updated': (ped: number) => void;

        /**
         * Call this function to `destroy` the `ped` and delete it from the player screen.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-preview-character-destroy': () => void;

        /**
         * Listen to this function when you want to know when the `destroy` event has been called
         *
         * @memberof ICustomEmitEvent
         */
        'crc-preview-character-destroyed': () => void;
    }
}
