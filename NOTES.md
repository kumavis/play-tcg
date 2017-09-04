rules:
  turn:
    phases:
      - turn start
        - reset creatures
          - iterate set (player.inPlay) -> change state
        - draw card
          - get random
          - pop item from set (deck)
          - add item to set (hand)
      - (user action) turn active
        - play cards
        - choose attackers
        - choose defenders
      - execute attack
      - check death
      - check victory