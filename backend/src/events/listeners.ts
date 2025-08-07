import { eventBus } from './eventBus';

eventBus.on('COACH_UNLOCKED', ({ playerId, coachId }) => {
    console.log(`[LOG] Coach ${coachId} unlocked by Player ${playerId}`);
    eventBus.emit('GRANT_XP', { playerId, amount: 5 });
});

eventBus.on('GRANT_XP', ({ playerId, amount }) => {
    console.log(`[XP] Granting ${amount} XP to Player ${playerId}`);
});

eventBus.on('RED_FLAG_TRIGGERED', ({ coachId }) => {
    console.log(`[ALERT] Red flag for coach ${coachId}.`);
});