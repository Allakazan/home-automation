import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
@Entity()
export class Device extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    userID: string;

    @Column({ type: 'varchar', length: 300 })
    room: string;

    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 300 })
    type: string;
}
