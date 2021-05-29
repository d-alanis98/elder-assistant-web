

export default class Time {
    static wait = (milliseconds: number) => (
        new Promise<void>((resolve, _) => {
            setTimeout(() => resolve(), milliseconds);
        })
    );
}