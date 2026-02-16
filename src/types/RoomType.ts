type RoomType = {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

type bookRoomType = {
    id: number;
    roomName: string;
    bookedBy: string;
    approvedBy: string;
    startTime: string;
    endTime: string;
}

type userType = {
    id: number;
    name: string;
}

export type { RoomType, bookRoomType, userType };