import { describe, expect, it } from "vitest";
import { technicalFormSchema } from "./technicalFormSchema";

const validInput = {
  bouwjaar: "1980",
  brutoVloeroppervlak: "1000",
  aantalWoningen: "20",
  mechanischeVentilatieAanwezig: "true",
  vloerverwarmingAanwezig: "false",
  tapwaterOpGas: "true",
  kokenOpGas: "false",
  gasverbruikVveTotaal: "50000",
  wensTotKoelen: "false",
  huidigSysteem: "collectief",
  dubbelGlas: "true",
  beschikbareRuimteInWoningM2: "5",
  beschikbareCollectieveRuimteBinnenM2: "10",
  beschikbareCollectieveRuimteTuinM2: "15",
  beschikbareCollectieveRuimteDakM2: "20",
  jaarVervangen: String(new Date().getFullYear() + 1),
  wtwAanwezig: "true",
};

describe("technicalFormSchema", () => {
  it("accepts a fully valid, coerced input", () => {
    const result = technicalFormSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bouwjaar).toBe(1980);
      expect(result.data.aantalWoningen).toBe(20);
    }
  });

  it("rejects a bouwjaar in the future", () => {
    const result = technicalFormSchema.safeParse({
      ...validInput,
      bouwjaar: String(new Date().getFullYear() + 1),
    });

    expect(result.success).toBe(false);
  });

  it("rejects a bouwjaar before 1500", () => {
    const result = technicalFormSchema.safeParse({
      ...validInput,
      bouwjaar: "1499",
    });

    expect(result.success).toBe(false);
  });

  it("requires aantalWoningen to be at least 1", () => {
    const result = technicalFormSchema.safeParse({
      ...validInput,
      aantalWoningen: "0",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid enum value for a boolean field", () => {
    const result = technicalFormSchema.safeParse({
      ...validInput,
      dubbelGlas: "maybe",
    });

    expect(result.success).toBe(false);
  });

  it("requires jaarVervangen to not be in the past", () => {
    const result = technicalFormSchema.safeParse({
      ...validInput,
      jaarVervangen: String(new Date().getFullYear() - 1),
    });

    expect(result.success).toBe(false);
  });

  it("treats buurtcode as optional", () => {
    const result = technicalFormSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it("rejects a payload where a required field is missing", () => {
    const { bouwjaar, ...rest } = validInput;
    void bouwjaar;
    const result = technicalFormSchema.safeParse(rest);

    expect(result.success).toBe(false);
  });
});
