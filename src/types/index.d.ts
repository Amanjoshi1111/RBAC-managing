export{}

declare global{
    namespace Express {
        interface Request{
            locals: Record<string, any>
        }
    }
}

declare module "jsonwebtoken" {
    export interface JwtPayload {
        role: string;
    }
}