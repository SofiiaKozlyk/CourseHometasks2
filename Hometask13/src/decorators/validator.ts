import { HttpError } from "routing-controllers";

export function ValidateArgs() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (args[0].userName && args[0].userName.length < 2) {
        throw new HttpError(400, 'User name must be at least 2 characters long');
      }
      if (args[0].email && !/\S+@\S+\.\S+/.test(args[0].email)) {
        throw new HttpError(400, 'Invalid email format');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}