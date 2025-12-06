"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function NoticeForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="my-3">
          <Plus />
          Criar novo aviso
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs my-3">
        <DialogHeader>
          <DialogTitle className="text-center">Novo Aviso</DialogTitle>
        </DialogHeader>
        <form>
          <div>
            <Label className="mb-2" htmlFor="noticeType">
              Tipo do aviso
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="mb-2">
                  <SelectItem value={"importante"}>Importante</SelectItem>
                  <SelectItem value={"informativo"}>Informativo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5">
            <Label htmlFor="notice" className="mb-2">
              Aviso
            </Label>
            <Textarea
              id="notice"
              placeholder="Digite seu aviso aqui."
              rows={3}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="submit" className="w-full my-5">
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
