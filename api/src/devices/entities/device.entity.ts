import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Device {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    room: string;

    @Column()
    name: string;

    @Column()
    type: string;
}
