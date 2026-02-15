import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import apiClient from "@/utils/ApiClient";
import { toast } from "sonner";

function CreateRoomDialog({ onRoomAdded }: { onRoomAdded: () => void }) {
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomLocation, setNewRoomLocation] = useState("");
  const [newRoomCapacity, setNewRoomCapacity] = useState(0);

  const clickAddRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    apiClient
      .post("/room", {
        name: newRoomName,
        location: newRoomLocation,
        capacity: newRoomCapacity,
      })
      .then(() => {

        onRoomAdded();
    
        setNewRoomName("");
        setNewRoomLocation("");
        setNewRoomCapacity(0);

        toast.success("Ruangan berhasil ditambahkan!");
      })
      .catch((error) => {
        toast.error("Gagal menambahkan ruangan: " + error.message);
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="d-block bg-green-500 text-white border-green-500 hover:bg-green-600 mt-4">
            Tambah Ruangan
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Tambah Ruangan Baru</DialogTitle>
            <DialogDescription>
              Isi informasi ruangan baru di bawah ini. Klik simpan ketika
              selesai.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="room-name">Nama Ruangan</FieldLabel>
            <Input
              onChange={(e) => setNewRoomName(e.target.value)}
              id="room-name"
              type="text"
              placeholder="Nama Ruangan"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="room-location">Lokasi Ruangan</FieldLabel>
            <Input
              onChange={(e) => setNewRoomLocation(e.target.value)}
              id="room-location"
              type="text"
              placeholder="Lokasi Ruangan"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="room-capacity">Kapasitas Ruangan</FieldLabel>
            <Input
              onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
              id="room-capacity"
              type="number"
              placeholder="Kapasitas Ruangan"
            />
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" onClick={clickAddRoom}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


export default CreateRoomDialog;