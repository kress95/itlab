export declare interface Config {
  username: string
  password: string
  database: string
  host: string
  dialect: 'postgres'
}

export declare const development: Config

export declare const test: Config

export declare const production: Config
