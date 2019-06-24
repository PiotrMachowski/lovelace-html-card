# Lovelace HTML card

This card displays provided data as an HTML content of a card.

## Configuration options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | `False` | - | Title of a card |
| `data` | `List` | `True` | - | List of HTML data |

### Data options

| Key | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `html` | `string` | `False` | - | HTML text |
| `entity_id` | `string` | `False` | - | ID of entity which state should be presented as HTML |
| `attribute` | `string` | `False` | - | If specified with `entity_id` value of attribute will be used instead of state |

**WARNING:** `html` and `entity_id` cannot be present in single list entry

## Example usage
```yaml
views:
- name: Example
  cards:
    - type: custom:html-card
      title: 'HTML card'
      data:
        - html: 'This is first <b>HTML</b> text'
        - entity_id: sensor.html_sensor
        - html: 'This is second <u>HTML</u> text'
        - entity_id: binary_sensor.ordinary_sensor
          attribute: html_attribute
```

## Installation
1. Download [*html-card.js*](https://github.com/PiotrMachowski/Home-Assistant-Lovelace-Xiaomi-Vacuum-Map-card/raw/master/xiaomi-vacuum-map-card.js) to `/www/custom_lovelace/html_card` folder:
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
