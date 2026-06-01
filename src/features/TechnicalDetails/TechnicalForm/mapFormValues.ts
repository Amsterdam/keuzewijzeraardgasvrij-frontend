import type { FormValues } from "./technicalFormSchema";

export function mapFormValues(formValues: FormValues) {
  return {
    aantal_woningen: formValues.aantalWoningen,
    bouwjaar: formValues.bouwjaar,
    bruto_vloeroppervlak: formValues.brutoVloeroppervlak,
    gasverbruik_vve_totaal: formValues.gasverbruikVveTotaal,
    mechanische_ventilatie_aanwezig: formValues.mechanischeVentilatieAanwezig,
    tapwater_op_gas: formValues.tapwaterOpGas,
    koken_op_gas: formValues.kokenOpGas,
    vloerverwarming_aanwezig: formValues.vloerverwarmingAanwezig,
    wens_tot_koelen: formValues.wensTotKoelen,
    huidig_systeem: formValues.huidigSysteem,
    dubbel_glas: formValues.dubbelGlas,
    beschikbare_ruimte_in_woning_m2: formValues.beschikbareRuimteInWoningM2,
    beschikbare_collectieve_ruimte_binnen_m2:
      formValues.beschikbareCollectieveRuimteBinnenM2,
    beschikbare_collectieve_ruimte_buiten_m2:
      formValues.beschikbareCollectieveRuimteBuitenM2,
    jaar_vervangen: formValues.jaarVervangen,
    wtw_aanwezig: formValues.wtwAanwezig,
    buurtcode: formValues.buurtcode,
  };
}

export type PrefillResponse = {
  bruto_vloeroppervlak?: number | null;
  aantal_woningen?: number | null;
  bouwjaar?: number | null;
  gasverbruik_vve_totaal?: number | null;
};

export function mapPrefillResponse(data: PrefillResponse): Partial<FormValues> {
  return {
    ...(data.bruto_vloeroppervlak != null && {
      brutoVloeroppervlak: data.bruto_vloeroppervlak,
    }),
    ...(data.aantal_woningen != null && {
      aantalWoningen: data.aantal_woningen,
    }),
    ...(data.bouwjaar != null && { bouwjaar: data.bouwjaar }),
    ...(data.gasverbruik_vve_totaal != null && {
      gasverbruikVveTotaal: data.gasverbruik_vve_totaal,
    }),
  };
}
