import express from 'express';
import { players } from '../mockData/players';
import { coaches } from '../mockData/coaches';
import { eventBus } from '../events/eventBus';

const router = express.Router();

router.post('/unlock', (req, res) => {
    const { playerId, coachId } = req.body;
    const player = players[playerId];
    const coach = coaches.find((coach) => coach.id === coach.id)

    if (!player || !coach) {
        return res.status(404).json({ error: 'Invalid player or coach' });
    }

    if (player.tokens < 10) {
        return res.status(400).json({ error: 'Not enough tokens' });
    }

    player.tokens -= 10;
    player.unlockedCoaches.push(coachId);

    eventBus.emit('COACH_UNLOCKED', { playerId, coachId });

    if (coach.redFlag) {
        eventBus.emit('RED_FLAG_TRIGGERED', { playerId, coachId });
    }

    return res.status(200).json({
        status: 'success',
        player,
        redFlag: coach.redFlag,
    });
});

export default router;