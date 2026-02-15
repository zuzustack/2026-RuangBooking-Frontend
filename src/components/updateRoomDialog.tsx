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
import type { RoomType } from "@/types/RoomType";

function UpdateRoomDialog({
  room,
  onRoomAdded,
}: {
  room: RoomType;
  onRoomAdded: () => void;
}) {
  const [newRoomName, setNewRoomName] = useState(room.name);
  const [newRoomLocation, setNewRoomLocation] = useState(room.location);
  const [newRoomCapacity, setNewRoomCapacity] = useState(room.capacity);

  const clickUpdateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    apiClient
      .put(`/room/${room.id}`, {
        name: newRoomName,
        location: newRoomLocation,
        capacity: newRoomCapacity,
      })
      .then(() => {
        onRoomAdded();
        toast.success("Ruangan berhasil diubah!");
      })
      .catch((error) => {
        toast.error("Gagal mengubah ruangan: " + error.message);
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"sm"} className="d-block bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 mt-4">
            Ubah
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Ruangan</DialogTitle>
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
              value={newRoomName}
              placeholder="Nama Ruangan"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="room-location">Lokasi Ruangan</FieldLabel>
            <Input
              onChange={(e) => setNewRoomLocation(e.target.value)}
              id="room-location"
              type="text"
              value={newRoomLocation}
              placeholder="Lokasi Ruangan"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="room-capacity">Kapasitas Ruangan</FieldLabel>
            <Input
              onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
              id="room-capacity"
              type="number"
              value={newRoomCapacity}
              placeholder="Kapasitas Ruangan"
            />
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" onClick={clickUpdateRoom}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateRoomDialog;
