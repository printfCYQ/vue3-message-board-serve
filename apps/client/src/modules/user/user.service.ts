import { User } from '@libs/db/models/user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'libs/utils/cryptogram.util';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async test() {
    return this.userRepository.find();
  }

  async current(id) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async logout() {
    return {
      message: '成功退出',
      code: 200,
    };
  }

  // 注册
  async register(registerDTO) {
    const { email, userName, password } = registerDTO;
    await this.checkRegister(registerDTO);

    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    const newUser: User = new User();
    newUser.email = email;
    newUser.password = hashPassword;
    newUser.userName = userName;
    newUser.salt = salt;

    const res = await this.userRepository.save(newUser);
    if (res) {
      return {
        message: '注册成功',
        code: 200,
      };
    } else {
      return {
        message: '注册失败',
        code: 2000,
      };
    }
  }

  async checkRegister(registerDTO): Promise<any> {
    const { email, userName, password, rePassword } = registerDTO;

    if (password !== rePassword) {
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST);
    }

    const existUserName = await this.userRepository.findOne({
      where: { userName },
    });
    const existEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existUserName || existEmail) {
      throw new HttpException(
        `${existUserName ? '用户名' : '邮箱'}已存在`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkLogin(loginDTO): Promise<any> {
    const { email, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async login(loginDTO): Promise<any> {
    const user = await this.checkLogin(loginDTO);
    const token = await this.certificate(user);
    if (token) {
      return {
        message: '登录成功',
        code: 200,
        data: {
          token,
        },
      };
    } else {
      return {
        message: '登录失败',
        cdeo: 2000,
      };
    }
  }

  async certificate(user: User) {
    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
