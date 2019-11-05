import { ApiModelProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiModelProperty()
    readonly login: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly email: string;
}