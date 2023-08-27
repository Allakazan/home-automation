import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Device {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userID: string;

    @Column()
    room: string;

    @Column()
    name: string;

    @Column()
    type: string;
}
