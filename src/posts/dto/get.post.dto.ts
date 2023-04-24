import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

enum SearchTypeEnum {
  t1 = 'nickname',
  t2 = 'title',
}

enum GetListTypeEnum {
  board1 = 'free',
  board2 = 'humor',
  board3 = 'championship',
}

export class PostGetListCondition {
  @ApiProperty({
    example: 'championship',
    description: '게시판 카테고리 명(free | humor | championship)',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(GetListTypeEnum)
  board: string;

  @ApiProperty({
    example: 3,
    description: '불러올 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  page: number;
}

export class PostSearchRequest {
  @ApiProperty({
    example: '꾸꾸까까',
    description: '검색어',
  })
  @IsNotEmpty()
  @IsString()
  keyword: string;
}

export class PostSearchCondition {
  @ApiProperty({
    example: 'title',
    description: '어떤 키워드로 검색할 것인지(nickname || title)',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(SearchTypeEnum)
  searchType: string;

  @ApiProperty({
    example: 3,
    description: '불러올 페이지 번호',
  })
  @IsNotEmpty()
  @IsInt()
  page: number;

  @ApiProperty({
    example: 'championship',
    description: '게시판 카테고리 명(free | humor | championship)',
  })
  @IsNotEmpty()
  @IsString()
  board: string;

  @ApiProperty({
    example: '꾸꾸까까',
    description: '검색어',
  })
  @IsNotEmpty()
  @IsString()
  keyword: string;
}
