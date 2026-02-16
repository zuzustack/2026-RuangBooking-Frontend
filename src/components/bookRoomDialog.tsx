import type { RoomType, userType } from "@/types/RoomType";
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
import { Button } from "@/components/ui/button";
import apiClient from "@/utils/ApiClient";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerTime } from "./dateTimePicker";

function BookRoomDialog({
  roomData,
  onBooked,
}: {
  roomData: RoomType[];
  userData: userType[];
  onBooked: () => void;
}) {
  const authData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const clickBookRoom = () => {
    if (selectedRoomId === 0) {
      toast.error("Silakan pilih ruangan terlebih dahulu.");
      return;
    }

    apiClient
      .post("/bookroom", {
        roomId: selectedRoomId,
        bookedBy: authData.id,
        startTime: startTime,
        endTime: endTime,
      })
      .then(() => {
        toast.success("Ruangan berhasil dibooking!");
        onBooked();
      })
      .catch((error) => {
        toast.error("Gagal booking ruangan: " + error.message);
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="d-block bg-green-500 text-white border-green-500 hover:bg-green-600 mt-4">
            Book Ruangan
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md" style={{ minWidth: "800px" }}>
          <DialogHeader>
            <DialogTitle>Booking Ruangan</DialogTitle>
            <DialogDescription>
              Isi informasi booking ruangan di bawah ini. Klik simpan ketika
              selesai.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="room-name">Nama Ruangan</FieldLabel>
            <Select onValueChange={(value) => setSelectedRoomId(Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Ruangan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ruangan</SelectLabel>
                  {roomData.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="room-location">Start Time</FieldLabel>
            <DatePickerTime onChange={(datetime) => setStartTime(datetime)} />
          </Field>

          <Field>
            <FieldLabel htmlFor="room-end-time">Waktu Selesai</FieldLabel>
            <DatePickerTime onChange={(datetime) => setEndTime(datetime)} />
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" onClick={clickBookRoom}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookRoomDialog;
