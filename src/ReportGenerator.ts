import type { User, Post, UserWithPosts} from './interfaces.js'
import { createLogger, fetchData } from './utils.js'

export class ReportGenerator {
    private fetchLog = createLogger('DataFetching');
    private processLog = createLogger('Processing')
    private successLog = createLogger('Success')
    private errorLog = createLogger('Error')
    private doneLog = createLogger('Done')
    
    constructor(private readonly baseURL: string){}

    private async fetchAllData(): Promise<{users: User[], posts: Post[]}> {
        this.fetchLog('Fetching users and posts...');

        const [users, posts] = await Promise.all([fetchData<User[]>(`${this.baseURL}/users`), fetchData<Post[]>(`${this.baseURL}/posts`)]);
        return { users, posts }
    }

    private processData(users: User[], posts: Post[]): UserWithPosts[] {
            this.processLog('Processing data...')
            const usersWithPosts: UserWithPosts[] = users.map(user => ({
                ...user,
                posts: posts.filter(post => post.userId === user.id)
            }))
            this.successLog('Users successfully merged with posts.')
            return usersWithPosts;
    }

    async run(): Promise<UserWithPosts[]> {
          try {
            const { users, posts }= await this.fetchAllData();
            const processedData = this.processData(users, posts);
            return processedData;

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong!'
            this.errorLog(errorMessage);
            return []
        } finally {
            this.doneLog('Fetching data finished')
        }
    }
}
