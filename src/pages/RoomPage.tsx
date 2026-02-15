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
import type { RoomType } from "@/types/RoomType";
import CreateRoomDialog from "@/components/createRoomDialog";
import UpdateRoomDialog from "@/components/updateRoomDialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";

function RoomPage() {
  const [roomData, setRoomData] = useState<RoomType[]>([]);

  const fetchRoomData = () => {
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
      <h1 className="text-2xl font-bold">Management Room</h1>

      <div className="w-full">
        <div className="flex justify-end">
          <CreateRoomDialog onRoomAdded={fetchRoomData} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roomData.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>
                  <UpdateRoomDialog room={room} onRoomAdded={fetchRoomData} />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size={"sm"}
                        className="d-block bg-red-500 ms-2 text-white border-red-500 hover:bg-red-600 mt-4"
                      >
                        Hapus
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Hapus Ruangan</DialogTitle>
                        <DialogDescription>
                          Apakah Anda yakin ingin menghapus ruangan ini?
                          Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            apiClient
                              .delete(`/room/${room.id}`)
                              .then(() => {
                                fetchRoomData();
                                toast.success("Ruangan berhasil dihapus!");
                              })
                              .catch((error) => {
                                toast.error(
                                  "Gagal menghapus ruangan: " + error.message,
                                );
                              });
                          }}
                        >
                          Hapus
                        </Button>
                        <DialogClose asChild>
                          <Button variant="outline">Batal</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default RoomPage;
