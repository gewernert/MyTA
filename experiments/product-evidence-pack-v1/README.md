# MyTA Product Evidence Pack v1

This pack records real rendered product states for evaluating the proposed Section 2 assignment journey. It does not contain reconstructed interfaces, new product UI, or website-section design.

## Runtime finding

The checked-out `MyTA` repository is the static marketing website. Its documented local command is:

```powershell
python -m http.server 8000
```

That command does not run the authenticated MyTA product. No local product source or product run command was present in this repository. Product evidence was therefore inspected in the existing authenticated MyTA preview already open in the browser:

`https://id-preview--ab016bcc-452f-4f7e-a447-a582a6648ae0.lovable.app/`

No credentials are stored in this pack.

## Capture notes

- Teacher desktop captures are exact 1440 × 1000 PNGs.
- Student desktop captures are authentic browser screenshots at 1440 × 641. The Chrome-controlled preview accepted a 1440 × 1000 viewport override but returned the visible browser surface height. The files were left unaltered rather than padded, stretched, or reconstructed.
- Student mobile captures are exact 390 × 844 PNGs.
- Mobile assignment evidence requires separate problem and MyTA views. The current responsive workspace does not show both panes at once.
- The guided-support image contains a real Hint interaction using the assignment's existing neutral problem.

## Contents

- `route-inventory.md` records the relevant product routes and their observed status.
- `evidence-audit.md` evaluates each requested evidence target.
- `section-2-readiness.md` gives the evidence-based readiness decision.
- `evidence/` contains the captured PNG files.

