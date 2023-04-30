
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
// import { Photo } from '../photos/photo.entity';

@Entity({name: 'Leads'})
export class Lead {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  responsible_user_id: number;

	@Column()
  group_id: number;

	@Column()
  status_id: number;

	@Column()
  created_at: number;

	@Column()
  created_by: number;

	@Column()
  updated_by: number;

	// @Column()
  // status_id: number;

	// @Column()
  // status_id: number;

	// @Column()
  // status_id: number;


	// @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];
}
