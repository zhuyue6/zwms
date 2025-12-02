
import { applyDecorators } from '@nestjs/common'
import { Length, IsString } from 'class-validator'

export function Name() {
    const useLength = Length(1, 32, {
        message: '姓名长度必须在1-32位之间'
    })
    return useLength
}

export function Password() {
    const useLength = Length(6, 32, {
        message: '密码长度必须在6-32位之间'
    })
    return applyDecorators(useLength)
}