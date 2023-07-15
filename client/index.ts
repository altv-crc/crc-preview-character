import * as alt from 'alt-client';
import * as native from 'natives';
import { Appearance } from 'alt-crc';

let ped: number;
let lastModel: number;

export function destroy(callDestroyEvent = true) {
    lastModel = undefined;

    if (typeof ped === 'undefined') {
        return;
    }

    try {
        native.setEntityAlpha(ped, 0, true);
        native.deletePed(ped);
        native.setPedAsNoLongerNeeded(ped);
    } catch (err) {}

    if (!callDestroyEvent) {
        return;
    }

    alt.logDebug(`crc-preview-character | Ped Destroyed`);
    alt.emit('crc-preview-character-destroyed');
}

export async function update(appearance: Appearance, pos: alt.Vector3) {
    if (!appearance) {
        return;
    }

    await alt.Utils.requestModel('mp_f_freemode_01');
    await alt.Utils.requestModel('mp_m_freemode_01');

    const model = appearance.sex === 0 ? alt.hash('mp_f_freemode_01') : alt.hash('mp_m_freemode_01');

    if (lastModel !== model) {
        destroy(false);
        lastModel = model;
        ped = native.createPed(1, model, pos.x, pos.y, pos.z, 0, false, false);

        native.setEntityCoordsNoOffset(ped, pos.x, pos.y, pos.z, false, false, false);
        native.setEntityInvincible(ped, true);
        native.setEntityRotation(ped, 0, 0, 125, 1, false);
        native.setPedDesiredHeading(ped, 125);
        native.taskSetBlockingOfNonTemporaryEvents(ped, true);
        native.setBlockingOfNonTemporaryEvents(ped, true);
        native.setPedFleeAttributes(ped, 0, true);
        native.setPedCombatAttributes(ped, 17, true);
        native.setPedAsEnemy(ped, false);

        alt.emit('crc-preview-character-updated', ped);
    }

    alt.logDebug(`crc-preview-character | Ped Updated`);
    alt.emit('crc-appearance-apply', ped, appearance);
}

alt.on('crc-preview-character-destroy', destroy);
alt.on('crc-preview-character-update', update);
alt.on('disconnect', destroy);
