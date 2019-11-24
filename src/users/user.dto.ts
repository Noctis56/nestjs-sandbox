import { ApiModelProperty } from "@nestjs/swagger";
import {IsString, IsEmail, IsNumber} from "class-validator";

export class UserDto {
    @IsNumber()
    @ApiModelProperty({ example: 7 })
    readonly id: number;

    @IsString()
    @ApiModelProperty({ example: 'Noctis56' })
    readonly login: string;

    @IsString()
    @ApiModelProperty({ example: 'strongPassword' })
    readonly password: string;

    @IsEmail()
    @ApiModelProperty({ example: 'test.test@test.fr' })
    readonly email: string;
}