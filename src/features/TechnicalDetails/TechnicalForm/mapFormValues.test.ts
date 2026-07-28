import { describe, expect, it } from "vitest";
import { mapFormValues, mapPrefillResponse } from "./mapFormValues";
import type { FormValues } from "./technicalFormSchema";

const formValues: FormValues = {
  bouwjaar: 1980,
  brutoVloeroppervlak: 1000,
  aantalWoningen: 20,
  mechanischeVentilatieAanwezig: "true",
  vloerverwarmingAanwezig: "false",
  tapwaterOpGas: "true",
  kokenOpGas: "false",
  gasverbruikVveTotaal: 50000,
  wensTotKoelen: "false",
  huidigSysteem: "collectief",
  dubbelGlas: "true",
  beschikbareRuimteInWoningM2: 5,
  beschikbareCollectieveRuimteBinnenM2: 10,
  beschikbareCollectieveRuimteTuinM2: 15,
  beschikbareCollectieveRuimteDakM2: 20,
  jaarVervangen: 2030,
  wtwAanwezig: "true",
  buurtcode: "A01",
};

describe("mapFormValues", () => {
  it("maps camelCase form values to the snake_case API payload", () => {
    expect(mapFormValues(formValues)).toEqual({
      aantal_woningen: 20,
      bouwjaar: 1980,
      bruto_vloeroppervlak: 1000,
      gasverbruik_vve_totaal: 50000,
      mechanische_ventilatie_aanwezig: "true",
      tapwater_op_gas: "true",
      koken_op_gas: "false",
      vloerverwarming_aanwezig: "false",
      wens_tot_koelen: "false",
      huidig_systeem: "collectief",
      dubbel_glas: "true",
      beschikbare_ruimte_in_woning_m2: 5,
      beschikbare_collectieve_ruimte_binnen_m2: 10,
      beschikbare_collectieve_ruimte_tuin_m2: 15,
      beschikbare_collectieve_ruimte_dak_m2: 20,
      jaar_vervangen: 2030,
      wtw_aanwezig: "true",
      buurtcode: "A01",
    });
  });
});

describe("mapPrefillResponse", () => {
  it("maps present snake_case fields to their camelCase form field", () => {
    expect(
      mapPrefillResponse({
        bruto_vloeroppervlak: 500,
        aantal_woningen: 12,
        bouwjaar: 1975,
        gasverbruik_vve_totaal: 30000,
      }),
    ).toEqual({
      brutoVloeroppervlak: 500,
      aantalWoningen: 12,
      bouwjaar: 1975,
      gasverbruikVveTotaal: 30000,
    });
  });

  it("omits fields that are null or undefined", () => {
    expect(
      mapPrefillResponse({
        bruto_vloeroppervlak: null,
        aantal_woningen: undefined,
        bouwjaar: 1975,
      }),
    ).toEqual({
      bouwjaar: 1975,
    });
  });

  it("returns an empty object when nothing is present", () => {
    expect(mapPrefillResponse({})).toEqual({});
  });
});
