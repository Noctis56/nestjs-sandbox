import { ApiModelProperty } from "@nestjs/swagger";
import {IsString, IsEmail} from "class-validator";

export class UserDto {
    @ApiModelProperty()
    @IsString()
    readonly login: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;
}