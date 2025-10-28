import { IS_PUBLIC_KEY } from '../../const/reflector'

import { SetMetadata } from '@nestjs/common';

// 创建@Public()装饰器，使用SetMetadata设置元数据
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);