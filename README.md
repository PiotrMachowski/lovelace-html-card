# Lovelace HTML card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)
[![buymeacoffee_badge](https://img.shields.io/badge/Donate-buymeacoffe-ff813f?style=flat)](https://www.buymeacoffee.com/PiotrMachowski)

This card displays provided data as an HTML content of a card.

## Configuration options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | `False` | - | Title of a card |
| `content` | `string` | `True` | - | Content of a card |

### Templates

 * Entity state, example: `[[ sun.sun ]]`, `[[ sun.sun.state ]]`
 * Entity attribute, example: `[[ sun.sun.attrubutes.elevation ]]`
 
## Example usage

![Example](https://github.com/PiotrMachowski/lovelace-html-card/raw/master/example.gif)


```yaml
views:
- name: Example
  cards:
    - type: custom:html-card
      title: 'HTML card'
      content: |
        Sun state: <b>[[sun.sun]]</b>, elevation: [[sun.sun.attributes.elevation]]</br>
        <b>Hello</b> there!<p>General <u>Kenobi!</u></p>
        <img src="https://i.redd.it/ltxppihy4cyy.jpg" width="70%"/></br>
        <ha-icon icon="mdi:speaker"></ha-icon> Volume: [[input_number.system_volume]]%</br>
        <center><img src="https://vignette.wikia.nocookie.net/starwars/images/f/fa/Modal_Nodes_02.jpg" width="[[input_number.system_volume]]%"/></center>
```

## Installation
1. Download [*html-card.js*](https://github.com/PiotrMachowski/lovelace-html-card/raw/master/dist/html-card.js) to `/www/custom_lovelace/html_card` directory:
    ```bash
    mkdir -p www/custom_lovelace/html_card
    cd www/custom_lovelace/html_card/
    wget https://github.com/PiotrMachowski/lovelace-html-card/raw/master/dist/html-card.js
    ```
2. Add card to resources in `ui-lovelace.yaml` or in raw editor if you are using frontend UI editor:
    ```yaml
    resources:
      - url: /local/custom_lovelace/html_card/html-card.js
        type: js
    ```

## Hints
* To use mdi icon follow example: `<ha-icon icon="mdi:weather-sunny"></ha-icon>`
* If you need more powerful templates check out [*HTML Template card*](https://github.com/PiotrMachowski/Home-Assistant-Lovelace-HTML-Template-card)
* The only improvement over [*markdown-mod*](https://github.com/thomasloven/lovelace-markdown-mod) that *html-card* provides is ability to use css styles.
* This card is available in [*HACS*](https://github.com/custom-components/hacs/)

<a href="https://www.buymeacoffee.com/PiotrMachowski" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
