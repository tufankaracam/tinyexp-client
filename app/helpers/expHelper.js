export const calculateExpData = (currentTotalExp) => {
    let rawLevel = Math.pow(currentTotalExp / 250, 1.25);
    let currentLevel = Math.floor(rawLevel);

    if (currentLevel < 1) currentLevel = 1;

    const nextLevel = currentLevel + 1;
    const nextLevelTotalReq = Math.round(250 * Math.pow(nextLevel, 0.8));
    const expNeeded = Math.max(0, nextLevelTotalReq - currentTotalExp);

    return {
        level: currentLevel,
        currentExp: currentTotalExp,
        nextLevel: nextLevel,
        requiredTotalExp: nextLevelTotalReq,
        expToNextLevel: expNeeded
    };
}