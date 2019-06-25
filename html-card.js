function hasConfigOrEntityChanged(element, changedProps) {
    if (changedProps.has("_config")) {
        return true;
    }
    const oldHass = changedProps.get("_hass");
    if (oldHass) {
        let changed = false;
        for (const data_entry of element._config.data) {
            changed = changed || data_entry.entity_id && oldHass.states[data_entry.entity_id] !== element._hass.states[data_entry.entity_id];
        }
        return changed;
    }
    return true;
}

class HtmlCard extends HTMLElement {

    static get properties() {
        return {
            _config: {},
            _hass: {}
        };
    }

    set hass(hass) {
        this._hass = hass;
        this.render();
    }

    shouldUpdate(changedProps) {
        return hasConfigOrEntityChanged(this, changedProps);
    }

    setConfig(config) {
        if (!config.data) {
            throw new Error("You need to define a 'data:' in your configuration")
        }
        if (config.data.length === 0) {
            throw new Error("You need to define at least one data in your configuration")
        }
        for (const data_entry of config.data) {
            if (!data_entry.entity_id && !data_entry.html) {
                throw new Error("You need to define an 'entity_id:' or 'html' in every data entry")
            }
            if (data_entry.entity_id && data_entry.html) {
                throw new Error("You can define only one of 'entity_id:'/'html' in every data entry")

            }
        }
        this._config = config;
    }

    render() {
        if (!this._config || !this._hass) {
            return ``;
        }
        let header = ``;
        let htmlValue = ``;
        for (const data_entry of this._config.data) {
            let entry_html;
            if (data_entry.html) {
                entry_html = data_entry.html;
            } else {
                if (data_entry.attribute) {
                    entry_html = this._hass.states[data_entry.entity_id].attributes[data_entry.attribute]
                }
                else {
                    entry_html = this._hass.states[data_entry.entity_id].state;
                }
            }
            htmlValue = htmlValue + entry_html;
        }
        if (this._config.title)
            header = `<div class="card-header" style="padding: 8px 0 16px 0;"><div class="name">
                      ${this._config.title}
                      </div></div>`;
        this.innerHTML = `<ha-card id="htmlCard" style="padding: 16px">
                ${header}
                <div>${htmlValue} </div>
                </ha-card>`;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('html-card', HtmlCard);
