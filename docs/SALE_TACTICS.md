# Sale tactics (launch switch)

## Live now

**Option 1 only** — `open_sale`  
~~$49.00~~ **Free · $0**, anyone can start free ADHD. No code. No scarcity meter.

Options **2** and **3** are **locked** until you say to rotate.

Lock switch: `app/src/features/sale/saleTactic.ts`

```ts
export const SALE_TACTIC_ROTATION_UNLOCKED = false // keep false until rotate
export const REQUESTED_SALE_TACTIC: SaleTacticMode = 'open_sale'
```

| Option | Mode | Status |
|--------|------|--------|
| 1 | `open_sale` | **Live** |
| 2 | `access_code` (code `1234`) | Locked |
| 3 | `scarcity_1000` (1–1000 spots) | Locked |

## When you want to rotate

1. Tell the agent / set `SALE_TACTIC_ROTATION_UNLOCKED = true`
2. Set `REQUESTED_SALE_TACTIC` to `access_code` or `scarcity_1000`

## UI pieces

- `SalePriceBadge` — mint ~~$49.00~~ Free · $0 chip
- `SaleCtaLink` — primary buttons with the chip inside
- `FreeAccessGate` — applies the active tactic on free ADHD entry
- `ScarcityMeter` / `AccessCodeGate` — only when rotation is unlocked and that mode is selected
