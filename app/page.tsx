"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRightLeft } from "lucide-react";

export default function Home() {
  const [price, setPrice] = useState<number>(160);
  const [divineInput, setDivineInput] = useState<number>(1);
  const [chaosInput, setChaosInput] = useState<number>(160);
  const [chaosRawOutput, setChaosRawOutput] = useState<number>(0);
  const [divineRawOutput, setDivineRawOutput] = useState<number>(0);
  const [divineOutput, setDivineOutput] = useState<number>(0);
  const [chaosOutput, setChaosOutput] = useState<number>(0);
  const [mode, setMode] = useState<"chaos" | "divine">("divine");

  useEffect(() => {
    const divineToChaos = (divine: number) => {
      return divine * price;
    };
    setChaosRawOutput(Math.floor(divineToChaos(divineInput)));
    const div = Math.floor(divineInput);
    setDivineOutput(div);
    const chaos = Math.floor((divineInput - Math.floor(divineInput)) * price);
    setChaosOutput(chaos);
  }, [divineInput, price]);

  useEffect(() => {
    const chaosToDivine = (chaos: number) => {
      return chaos / price;
    };
    setDivineRawOutput(Math.floor(chaosToDivine(chaosInput) * 10) / 10);
    const div = Math.floor(chaosToDivine(chaosInput));
    setDivineOutput(div);
    const chaos = Math.round(
      (chaosToDivine(chaosInput) - Math.floor(chaosToDivine(chaosInput))) *
        price
    );
    setChaosOutput(chaos);
  }, [chaosInput, price]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Divine and Chaos Converter</CardTitle>
          <CardDescription>
            Turns Divines in decimal form into Divine + Chaos or just Chaos and
            vice versa.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="price" className="flex items-center gap-1">
              Current Divine Price{" "}
              <Image
                src="/chaos_orb.png"
                alt="Chaos Orb"
                width={24}
                height={24}
              />
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <Separator className="mt-3" />
          {mode === "divine" ? (
            <>
              <div className="flex flex-col gap-1">
                <Label htmlFor="divine">
                  <div className="flex items-center gap-1">
                    Divines
                    <Image
                      src="/divine_orb.png"
                      alt="Divine Orb"
                      width={24}
                      height={24}
                    />
                  </div>
                </Label>
                <Input
                  id="divine"
                  type="number"
                  value={divineInput}
                  onChange={(e) => setDivineInput(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <span>= {chaosRawOutput}</span>
                  <Image
                    src="/chaos_orb.png"
                    alt="Chaos Orb"
                    width={24}
                    height={24}
                  />
                </div>
                {divineOutput !== 0 && chaosOutput !== 0 && (
                  <>
                    OR
                    <div className="flex items-center gap-1">
                      <span>{divineOutput}</span>
                      <Image
                        src="/divine_orb.png"
                        alt="Divine Orb"
                        width={24}
                        height={24}
                      />{" "}
                      +<span>{chaosOutput}</span>
                      <Image
                        src="/chaos_orb.png"
                        alt="Chaos Orb"
                        width={24}
                        height={24}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <Label htmlFor="chaos">
                  <div className="flex items-center gap-1">
                    Chaos
                    <Image
                      src="/chaos_orb.png"
                      alt="Chaos Orb"
                      width={24}
                      height={24}
                    />
                  </div>
                </Label>
                <Input
                  id="chaos"
                  type="number"
                  value={chaosInput}
                  onChange={(e) => setChaosInput(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2">
                ≈
                <div className="flex items-center gap-1">
                  <span> {divineRawOutput}</span>
                  <Image
                    src="/divine_orb.png"
                    alt="Divine Orb"
                    width={24}
                    height={24}
                  />
                </div>
                {divineOutput !== 0 && chaosOutput !== 0 && (
                  <>
                    OR
                    <div className="flex items-center gap-1">
                      <span>{divineOutput}</span>
                      <Image
                        src="/divine_orb.png"
                        alt="Divine Orb"
                        width={24}
                        height={24}
                      />{" "}
                      +<span>{chaosOutput}</span>
                      <Image
                        src="/chaos_orb.png"
                        alt="Chaos Orb"
                        width={24}
                        height={24}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          <div className="flex">
            <Button
              onClick={() => {
                setMode(mode === "divine" ? "chaos" : "divine");
                setDivineInput(1);
                setChaosInput(160);
              }}
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
