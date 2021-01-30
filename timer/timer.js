class Timer {
    constructor(element, presentation) {
        this.presentation = presentation;
        this.element = element;
        this.running = false;
        this.startTime = null;
        this.interval = null;
        this.initialTime = null;
        this.ended = false;
    }

    setup() {
        this.presentation.css("height", "90vh");
        this.element.show();
        this.element.css("height", "10vh");
        let bar = $("#progress-bar");
        bar.show();
        bar.css("height", "10vh");
    }

    startTimer(duration) {
        this.setup();
        let t = this;
        this.startTime = duration + 1;
        this.initialTime = duration;
        this.running = true;
        this.ended = false;
        this.refreshTime();
        this.interval = setInterval(function () {
            t.refreshTime();
            if (t.ended) {
                clearInterval(t.interval);
                t.element.hide();
                t.element.css("height", "0vh");
                t.presentation.css("height", "100vh");
            }
        }, 1000);
    }

    refreshTime() {
        if (this.startTime > 0 && this.running) {
            this.startTime--;
            this.updateTimer();
        } else if (this.startTime <= 0 || this.ended) {
            this.running = false;
            this.ended = true;
            clearInterval(this.interval);
        }
    }

    updateTimer() {
        const emojis = "🕛 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚".split(" ");
        $("#counter").html(emojis[(this.initialTime - this.startTime) % 12] + this.startTime + "с");
        $("#progress-bar").css("width",(this.startTime) / (this.initialTime / 100) + "vw")
    }
}

