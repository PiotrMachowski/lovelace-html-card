# Lovelace HTML card

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

![Example](https://github.com/PiotrMachowski/Home-Assistant-Lovelace-HTML-card/raw/master/example.jpg)


```yaml
views:
- name: Example
  cards:
    - type: custom:html-card
      title: 'HTML card'
      content: |
        Sun state: <b>[[sun.sun]]</b>, elevation: [[sun.sun.attributes.elevation]]</br>
        <b>Hello</b> there!<p>General <u>Kenobi!</u></p>
        <img src="https://i.redd.it/ltxppihy4cyy.jpg" width="100%"/>
```

## Installation
1. Download [*html-card.js*](https://github.com/PiotrMachowski/Home-Assistant-Lovelace-HTML-card/raw/master/xiaomi-vacuum-map-card.js) to `/www/custom_lovelace/html_card` directory:
    ```bash
    mkdir -p www/custom_lovelace/html_card
    cd www/custom_lovelace/html_card/
    wget https://github.com/PiotrMachowski/Home-Assistant-Lovelace-HTML-card/raw/master/html-card.js
    ```
2. Add card to resources in `ui-lovelace.yaml` or in raw editor if you are using frontend UI editor:
    ```yaml
    resources:
      - url: /local/custom_lovelace/html_card/html-card.js
        type: js
    ```

## Hints
* To use mdi icon follow example: `<ha-icon icon="mdi:weather-sunny"></ha-icon>`