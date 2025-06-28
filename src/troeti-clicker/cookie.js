class ElephantClicker {
    constructor() {
        this.elephants = 0;
        this.elephantsPerSecond = 0;
        this.totalClicks = 0;
        this.clickPower = 1;

        this.upgrades = [
            {
                id: 'oma',
                name: '🧓 Elefanten-Oma',
                description: 'Produziert 1 Elefant pro Sekunde',
                baseCost: 15,
                cost: 15,
                count: 0,
                production: 1,
                multiplier: 1.15,
                unlockThreshold: 10
            },
            {
                id: 'farm',
                name: '🌾 Elefanten-Farm',
                description: 'Produziert 8 Elefanten pro Sekunde',
                baseCost: 100,
                cost: 100,
                count: 0,
                production: 8,
                multiplier: 1.15,
                unlockThreshold: 50
            },
            {
                id: 'mine',
                name: '⛏️ Elefanten-Mine',
                description: 'Produziert 47 Elefanten pro Sekunde',
                baseCost: 1100,
                cost: 1100,
                count: 0,
                production: 47,
                multiplier: 1.15,
                unlockThreshold: 500
            },
            {
                id: 'factory',
                name: '🏭 Elefanten-Fabrik',
                description: 'Produziert 260 Elefanten pro Sekunde',
                baseCost: 12000,
                cost: 12000,
                count: 0,
                production: 260,
                multiplier: 1.15,
                unlockThreshold: 5000
            },
            {
                id: 'bank',
                name: '🏦 Elefanten-Bank',
                description: 'Produziert 1400 Elefanten pro Sekunde',
                baseCost: 130000,
                cost: 130000,
                count: 0,
                production: 1400,
                multiplier: 1.15,
                unlockThreshold: 25000
            },
            {
                id: 'temple',
                name: '🏛️ Elefanten-Tempel',
                description: 'Produziert 7800 Elefanten pro Sekunde',
                baseCost: 1400000,
                cost: 1400000,
                count: 0,
                production: 7800,
                multiplier: 1.15,
                unlockThreshold: 100000
            },
            {
                id: 'portal',
                name: '🌀 Elefanten-Portal',
                description: 'Produziert 44000 Elefanten pro Sekunde',
                baseCost: 20000000,
                cost: 20000000,
                count: 0,
                production: 44000,
                multiplier: 1.15,
                unlockThreshold: 500000
            },
            {
                id: 'dimension',
                name: '🌌 Elefanten-Dimension',
                description: 'Produziert 260000 Elefanten pro Sekunde',
                baseCost: 330000000,
                cost: 330000000,
                count: 0,
                production: 260000,
                multiplier: 1.15,
                unlockThreshold: 5000000
            },
            {
                id: 'condenser',
                name: '⚡ Elefanten-Kondensator',
                description: 'Produziert 1.6 Millionen Elefanten pro Sekunde',
                baseCost: 5100000000,
                cost: 5100000000,
                count: 0,
                production: 1600000,
                multiplier: 1.15,
                unlockThreshold: 100000000
            },
            {
                id: 'singularity',
                name: '🕳️ Elefanten-Singularität',
                description: 'Produziert 10 Millionen Elefanten pro Sekunde',
                baseCost: 75000000000,
                cost: 75000000000,
                count: 0,
                production: 10000000,
                multiplier: 1.15,
                unlockThreshold: 1000000000
            },
            {
                id: 'nebula',
                name: '🌠 Elefanten-Nebel',
                description: 'Produziert 100 Millionen Elefanten pro Sekunde',
                baseCost: 1000000000000,
                cost: 1000000000000,
                count: 0,
                production: 100000000,
                multiplier: 1.15,
                unlockThreshold: 10000000000
            },
            {
                id: 'multiverse',
                name: '🌐 Elefanten-Multiversum',
                description: 'Produziert 1 Milliarde Elefanten pro Sekunde',
                baseCost: 15000000000000,
                cost: 15000000000000,
                count: 0,
                production: 1000000000,
                multiplier: 1.15,
                unlockThreshold: 100000000000
            }
        ];

        this.achievements = [
            {
                id: 'first_elephant',
                name: 'Erster Elefant',
                description: 'Klicke deinen ersten Elefanten',
                condition: () => this.totalClicks >= 1,
                unlocked: false
            },
            {
                id: 'hundred_elephants',
                name: 'Hundert Elefanten',
                description: 'Sammle 100 Elefanten',
                condition: () => this.elephants >= 100,
                unlocked: false
            },
            {
                id: 'first_oma',
                name: 'Erste Oma',
                description: 'Kaufe deine erste Elefanten-Oma',
                condition: () => this.upgrades[0].count >= 1,
                unlocked: false
            },
            {
                id: 'thousand_elephants',
                name: 'Tausend Elefanten',
                description: 'Sammle 1.000 Elefanten',
                condition: () => this.elephants >= 1000,
                unlocked: false
            },
            {
                id: 'first_factory',
                name: 'Erste Fabrik',
                description: 'Kaufe deine erste Elefanten-Fabrik',
                condition: () => this.upgrades[3].count >= 1,
                unlocked: false
            },
            {
                id: 'million_elephants',
                name: 'Million Elefanten',
                description: 'Sammle 1.000.000 Elefanten',
                condition: () => this.elephants >= 1000000,
                unlocked: false
            },
            {
                id: 'billion_elephants',
                name: 'Milliarde Elefanten',
                description: 'Sammle 1.000.000.000 Elefanten',
                condition: () => this.elephants >= 1000000000,
                unlocked: false
            },
            {
                id: 'trillion_elephants',
                name: 'Billion Elefanten',
                description: 'Sammle 1.000.000.000.000 Elefanten',
                condition: () => this.elephants >= 1000000000000,
                unlocked: false
            }
        ];

        this.init();
    }

    init() {
        this.loadGame();
        this.bindEvents();
        this.updateDisplay();
        this.updateUpgrades();
        this.updateAchievements();
        this.startGameLoop();
    }

    bindEvents() {
        document.getElementById('elephantButton').addEventListener('click', (e) => this.clickElephant(e));
        document.getElementById('saveBtn').addEventListener('click', () => this.saveGame());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportGame());
        document.getElementById('importBtn').addEventListener('click', () => this.importGame());
    }

    clickElephant(event) {
        this.elephants += this.clickPower;
        this.totalClicks++;

        // Click-Effekt
        this.showClickEffect(event);

        this.updateDisplay();
        this.checkAchievements();
        this.saveGame();
    }

    showClickEffect(event) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.textContent = `+${this.clickPower}`;
        effect.style.left = (event.clientX - 20) + 'px';
        effect.style.top = (event.clientY - 20) + 'px';
        document.body.appendChild(effect);

        setTimeout(() => {
            document.body.removeChild(effect);
        }, 1000);
    }

    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade || this.elephants < upgrade.cost) return;

        this.elephants -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.count));

        this.calculateElephantPerSecond();
        this.updateDisplay();
        this.updateUpgrades();
        this.checkAchievements();
        this.saveGame();
    }

    calculateElephantPerSecond() {
        this.elephantsPerSecond = this.upgrades.reduce((total, upgrade) => {
            return total + (upgrade.count * upgrade.production);
        }, 0);
    }

    updateDisplay() {
        document.getElementById('elephantCount').textContent = this.formatNumber(Math.floor(this.elephants));
        document.getElementById('elephantsPerSecond').textContent = `${this.formatNumber(this.elephantsPerSecond)} Elefanten pro Sekunde`;
        document.getElementById('totalClicks').textContent = this.formatNumber(this.totalClicks);
    }

    updateUpgrades() {
        const container = document.getElementById('upgradesContainer');
        container.innerHTML = '';

        // Sort upgrades by cost
        const sortedUpgrades = [...this.upgrades].sort((a, b) => a.cost - b.cost);

        sortedUpgrades.forEach(upgrade => {
            // Check if upgrade should be visible
            const shouldShow = upgrade.count > 0 ||
                this.elephants >= upgrade.unlockThreshold * 0.5 ||
                this.getNextUpgradeCost() >= upgrade.cost;

            if (!shouldShow) return;

            const upgradeDiv = document.createElement('div');
            upgradeDiv.className = 'upgrade-item';

            if (this.elephants >= upgrade.cost) {
                upgradeDiv.classList.add('affordable');
            } else {
                upgradeDiv.classList.add('unaffordable');
            }

            upgradeDiv.innerHTML = `
                <div class="upgrade-header">
                    <span class="upgrade-name">${upgrade.name}</span>
                    <span class="upgrade-count">${upgrade.count}</span>
                </div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-cost">${this.formatNumber(upgrade.cost)} Elefanten</div>
                <div class="upgrade-production">Produktion: ${this.formatNumber(upgrade.production)}/s</div>
            `;

            upgradeDiv.addEventListener('click', () => this.buyUpgrade(upgrade.id));
            container.appendChild(upgradeDiv);
        });
    }

    getNextUpgradeCost() {
        // Find the cheapest upgrade the player can't afford yet
        const affordableUpgrades = this.upgrades.filter(u => this.elephants >= u.cost);
        if (affordableUpgrades.length === 0) {
            return this.upgrades[0].cost;
        }

        const nextUpgrade = this.upgrades
            .filter(u => this.elephants < u.cost)
            .sort((a, b) => a.cost - b.cost)[0];

        return nextUpgrade ? nextUpgrade.cost : Infinity;
    }

    updateAchievements() {
        const container = document.getElementById('achievementsContainer');
        container.innerHTML = '';

        this.achievements.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement';

            if (achievement.unlocked) {
                achievementDiv.classList.add('unlocked');
            }

            achievementDiv.innerHTML = `
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            `;

            container.appendChild(achievementDiv);
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked && achievement.condition()) {
                achievement.unlocked = true;
                this.showAchievementNotification(achievement);
            }
        });
        this.updateAchievements();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4ade80, #22c55e);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        notification.textContent = `🏆 Erfolg freigeschaltet: ${achievement.name}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    startGameLoop() {
        setInterval(() => {
            if (this.elephantsPerSecond > 0) {
                this.elephants += this.elephantsPerSecond / 10; // 10 FPS
                this.updateDisplay();
                this.checkAchievements();
            }
        }, 100);

        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveGame();
        }, 30000);
    }

    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return Math.floor(num).toString();
    }

    saveGame() {
        const gameState = {
            elephants: this.elephants,
            totalClicks: this.totalClicks,
            upgrades: this.upgrades,
            achievements: this.achievements,
            saveTime: Date.now()
        };
        localStorage.setItem('elephantClickerSave', JSON.stringify(gameState));
    }

    loadGame() {
        const savedGame = localStorage.getItem('elephantClickerSave');
        if (savedGame) {
            try {
                const gameState = JSON.parse(savedGame);
                this.elephants = gameState.elephants || 0;
                this.totalClicks = gameState.totalClicks || 0;

                if (gameState.upgrades) {
                    gameState.upgrades.forEach(savedUpgrade => {
                        const upgrade = this.upgrades.find(u => u.id === savedUpgrade.id);
                        if (upgrade) {
                            upgrade.count = savedUpgrade.count;
                            upgrade.cost = savedUpgrade.cost;
                        }
                    });
                }

                if (gameState.achievements) {
                    gameState.achievements.forEach(savedAchievement => {
                        const achievement = this.achievements.find(a => a.id === savedAchievement.id);
                        if (achievement) {
                            achievement.unlocked = savedAchievement.unlocked;
                        }
                    });
                }

                this.calculateElephantPerSecond();

                // Offline-Fortschritt berechnen
                if (gameState.saveTime && this.elephantsPerSecond > 0) {
                    const offlineTime = (Date.now() - gameState.saveTime) / 1000;
                    const offlineEarnings = Math.min(offlineTime * this.elephantsPerSecond, this.elephantsPerSecond * 3600); // Max 1 Stunde
                    if (offlineEarnings > 0) {
                        this.elephants += offlineEarnings;
                        this.showOfflineProgress(offlineEarnings, offlineTime);
                    }
                }
            } catch (e) {
                console.error('Fehler beim Laden des Spielstands:', e);
            }
        }
    }

    showOfflineProgress(earnings, time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        let timeString = '';
        if (hours > 0) timeString += `${hours}h `;
        if (minutes > 0) timeString += `${minutes}m`;

        alert(`Willkommen zurück! Du warst ${timeString} offline und hast ${this.formatNumber(earnings)} Elefanten verdient!`);
    }

    resetGame() {
        if (confirm('Möchtest du wirklich deinen gesamten Spielstand zurücksetzen?')) {
            localStorage.removeItem('elephantClickerSave');
            location.reload();
        }
    }

    exportGame() {
        const gameState = {
            elephants: this.elephants,
            totalClicks: this.totalClicks,
            upgrades: this.upgrades,
            achievements: this.achievements
        };
        const exportString = btoa(JSON.stringify(gameState));

        navigator.clipboard.writeText(exportString).then(() => {
            alert('Spielstand wurde in die Zwischenablage kopiert!');
        }).catch(() => {
            prompt('Kopiere diesen Code:', exportString);
        });
    }

    importGame() {
        const importString = document.getElementById('importInput').value.trim();
        if (!importString) {
            alert('Bitte gib einen gültigen Spielstand-Code ein!');
            return;
        }

        try {
            const gameState = JSON.parse(atob(importString));

            this.elephants = gameState.elephants || 0;
            this.totalClicks = gameState.totalClicks || 0;

            if (gameState.upgrades) {
                gameState.upgrades.forEach(savedUpgrade => {
                    const upgrade = this.upgrades.find(u => u.id === savedUpgrade.id);
                    if (upgrade) {
                        upgrade.count = savedUpgrade.count;
                        upgrade.cost = savedUpgrade.cost;
                    }
                });
            }

            if (gameState.achievements) {
                gameState.achievements.forEach(savedAchievement => {
                    const achievement = this.achievements.find(a => a.id === savedAchievement.id);
                    if (achievement) {
                        achievement.unlocked = savedAchievement.unlocked;
                    }
                });
            }

            this.calculateElephantPerSecond();
            this.updateDisplay();
            this.updateUpgrades();
            this.updateAchievements();
            this.saveGame();

            document.getElementById('importInput').value = '';
            alert('Spielstand erfolgreich importiert!');
        } catch (e) {
            alert('Ungültiger Spielstand-Code!');
        }
    }
}

// Spiel starten
const game = new ElephantClicker();

// CSS Animation für Erfolgs-Benachrichtigung
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);