"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { addressSchema, type AddressInput } from "../schemas";

type Props = {
  defaultValues?: Partial<AddressInput>;
  onSave: (address: AddressInput) => void;
};

export function AddressForm({ defaultValues, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInput>({ resolver: zodResolver(addressSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
      <Input
        id="recipient"
        label="Nome de quem recebe"
        error={errors.recipient?.message}
        {...register("recipient")}
      />
      <Input id="phone" label="Telefone" error={errors.phone?.message} {...register("phone")} />
      <Input id="zip" label="CEP" error={errors.zip?.message} {...register("zip")} />
      <div className="grid grid-cols-[1fr_120px] gap-3">
        <Input id="street" label="Rua" error={errors.street?.message} {...register("street")} />
        <Input id="number" label="Número" error={errors.number?.message} {...register("number")} />
      </div>
      <Input
        id="complement"
        label="Complemento (opcional)"
        error={errors.complement?.message}
        {...register("complement")}
      />
      <Input
        id="neighborhood"
        label="Bairro"
        error={errors.neighborhood?.message}
        {...register("neighborhood")}
      />
      <div className="grid grid-cols-[1fr_100px] gap-3">
        <Input id="city" label="Cidade" error={errors.city?.message} {...register("city")} />
        <Input
          id="state"
          label="UF"
          maxLength={2}
          error={errors.state?.message}
          {...register("state")}
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar endereço
      </Button>
    </form>
  );
}
