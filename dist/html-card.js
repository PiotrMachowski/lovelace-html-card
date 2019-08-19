const TEMPLATE_REGEX = /\[\[.*?\]\]/gm;

class HtmlCard extends HTMLElement {

    static get properties() {
        return {
            _config: {},
            _hass: {},
        };
    }

    set hass(hass) {
        const oldHass = this._hass;
        this._hass = hass;
        if (this.shouldUpdate(oldHass)) {
            this.render();
        }
    }

    shouldUpdate(oldHass) {
        if (oldHass) {
            let should = false;
            this._entities.forEach(entity => {
                should = should || oldHass.states[entity] !== this._hass.states[entity]
                    || oldHass.states[entity].attributes !== this._hass.states[entity].attributes
            });
            return should;
        }
        return true;
    }

    setConfig(config) {
        if (!config.content) {
            throw new Error("You need to define 'content' in your configuration.")
        }
        let entities = [];
        let m;
        while ((m = TEMPLATE_REGEX.exec(config.content)) !== null) {
            if (m.index === TEMPLATE_REGEX.lastIndex) {
                TEMPLATE_REGEX.lastIndex++;
            }
            m.forEach(match => {
                let e = match.replace("[[", "").replace("]]", "").replace(/\s/gm, "");
                let split = e.split(".");
                let entity_id = split[0] + "." + split[1];
                entities.push(entity_id);
            });
        }
        this._entities = entities;
        this._config = config;
        this.render();
    }

    render() {
        if (!this._config || !this._hass) {
            return ``;
        }
        let header = ``;
        let content = this._config.content;
        let outputContent = content.replace(/\r?\n|\r/g, "");
        let m;
        while ((m = TEMPLATE_REGEX.exec(content)) !== null) {
            if (m.index === TEMPLATE_REGEX.lastIndex) {
                TEMPLATE_REGEX.lastIndex++;
            }
            m.forEach(match => {
                let e = match.replace("[[", "").replace("]]", "").replace(/\s/gm, "");
                let split = e.split(".");
                let dots = split.length - 1;
                let output;
                if (dots === 1 || dots === 2 && split[2] === "state") {
                    let id = split[0] + "." + split[1];
                    output = this._hass.states[id].state;
                } else if (dots === 3 && split[2] === "attributes") {
                    let id = split[0] + "." + split[1];
                    let attribute = split[3];
                    output = this._hass.states[id].attributes[attribute];
                } else {
                    output = match;
                }
                outputContent = outputContent.replace(match, output);
            });
        }
        if (this._config.title)
            header = `<div class="card-header" style="padding: 8px 0 16px 0;"><div class="name">${this._config.title}</div></div>`;
        this.innerHTML = `<ha-card id="htmlCard" style="padding: 16px">${header}<div>${outputContent}</div></ha-card>`;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('html-card', HtmlCard);
