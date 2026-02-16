import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import apiClient from "@/utils/ApiClient";
import type { bookRoomType, RoomType } from "@/types/RoomType";
import BookRoomDialog from "@/components/bookRoomDialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function BookingPage() {
  const [bookedRooms, setBookedRooms] = useState<bookRoomType[]>([]);
  const [roomData, setRoomData] = useState<RoomType[]>([]);

  const authData = JSON.parse(localStorage.getItem("userData") || "{}");

  const fetchRoomData = () => {
    apiClient
      .get("/bookroom")
      .then((response) => {
        setBookedRooms(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });

    apiClient
      .get("/room")
      .then((response) => {
        setRoomData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Booking Management</h1>

      <div className="w-full">
        <div className="flex justify-end">
          <BookRoomDialog roomData={roomData} onBooked={fetchRoomData} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Di Pesan Oleh </TableHead>
              <TableHead>Di Approve Oleh</TableHead>
              <TableHead>Waktu Mulai</TableHead>
              <TableHead>Waktu Selesai</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookedRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>{room.bookedBy}</TableCell>
                <TableCell>{room.approvedBy}</TableCell>
                <TableCell>{room.startTime}</TableCell>
                <TableCell>{room.endTime}</TableCell>
                <TableCell>
                  {authData.role === "admin" && room.approvedBy === null && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size={"sm"}
                          className="d-block bg-green-500 ms-2 text-white border-green-500 hover:bg-green-600"
                        >
                          Approve
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Approve Booking</DialogTitle>
                          <DialogDescription>
                            Apakah Anda yakin ingin menyetujui booking ini?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              apiClient
                                .post(`/bookroom/${room.id}/approve`, {
                                  approvedBy: authData.id,
                                })
                                .then(() => {
                                  fetchRoomData();
                                  toast.success("Booking berhasil disetujui!");
                                })
                                .catch((error) => {
                                  toast.error(
                                    "Gagal menyetujui booking: " +
                                      error.message,
                                  );
                                });
                            }}
                          >
                            Approve
                          </Button>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {authData.role.toLowerCase() === "user" && room.bookedBy === authData.username && room.approvedBy === null && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size={"sm"}
                          className="d-block bg-red-500 ms-2 text-white border-red-500 hover:bg-red-600"
                        >
                          Cancel
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Cancel Booking</DialogTitle>
                          <DialogDescription>
                            Apakah Anda yakin ingin membatalkan booking ini?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              apiClient
                                .delete(`/bookroom/${room.id}`)
                                .then(() => {
                                  fetchRoomData();
                                  toast.success("Booking berhasil dibatalkan!");
                                })
                                .catch((error) => {
                                  toast.error(
                                    "Gagal membatalkan booking: " +
                                      error.message,
                                  );
                                });
                            }}
                          >
                            Batalkan
                          </Button>
                          <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default BookingPage;
