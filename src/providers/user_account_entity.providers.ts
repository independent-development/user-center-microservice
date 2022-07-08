import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { sex_enum } from "@/emuns/sex_enum";
import { user_role_enum } from "@/emuns/user_role_enum";

@Entity({ database: "user", name: "user_account" })
export class UserAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string | undefined;

  /** 用户的角色 **/
  @Column({
    type: "enum",
    enum: user_role_enum,
    nullable: false,
    default: user_role_enum.COMMON,
    comment: "用户角色",
  })
  role: string | undefined;

  /** 用户名 **/
  @Column({
    length: 15,
    name: "username",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  username: string | undefined;

  /** 密码 **/
  @Column({ type: "varchar", length: 40, nullable: false, comment: "密码" })
  password: string | undefined;

  /** 用户的e_mail **/
  @Column({
    type: "varchar",
    length: 40,
    nullable: true,
    unique: true,
    comment: "邮箱地址",
  })
  e_mail: string | undefined;

  /** 绑定的web3钱包 **/
  @Column({
    type: "varchar",
    length: 40,
    nullable: true,
    comment: "绑定的钱包",
  })
  wallet: string | undefined;

  /** 手机号码 **/
  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
    unique: true,
    comment: "关联手机",
  })
  mobile_phone: string | undefined;

  /** 性别 **/
  @Column({
    type: "enum",
    enum: sex_enum,
    default: sex_enum.UNKNOW,
    nullable: true,
    comment: "性别",
  })
  sex: string | undefined;

  @Column({
    type: "datetime",
    nullable: true,
    comment: "出生年月",
  })
  birth: string | undefined;

  @CreateDateColumn({
    type: "datetime",
    name: "create_time",
    comment: "用户注册时间",
  })
  create_time: string | undefined;

  @UpdateDateColumn({
    type: "datetime",
    name: "update_time",
    comment: "用户信息更新时间",
  })
  update_time: string | undefined;

  @DeleteDateColumn({
    type: "datetime",
    name: "delete_time",
    comment: "用户信息更新时间",
  })
  delete_time: string | undefined;
}
