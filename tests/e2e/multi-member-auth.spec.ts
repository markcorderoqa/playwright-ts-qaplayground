import { test, expect } from '@fixtures/test.fixture';
import { env } from '@config/env';

test.describe('Multi-member authentication', () => {
  test('supports two member sessions in parallel', async ({ createAuthenticatedSession }) => {
    test.skip(
      !env.AUTH_MEMBER_1_USERNAME ||
        !env.AUTH_MEMBER_1_PASSWORD ||
        !env.AUTH_MEMBER_2_USERNAME ||
        !env.AUTH_MEMBER_2_PASSWORD,
      'AUTH_MEMBER_1_* and AUTH_MEMBER_2_* credentials are required in .env',
    );

    const [member1, member2] = await Promise.all([
      createAuthenticatedSession('member1'),
      createAuthenticatedSession('member2'),
    ]);

    await Promise.all([member1.page.goto(env.BASE_URL), member2.page.goto(env.BASE_URL)]);

    await test.step('sessions are isolated across browser contexts', async () => {
      await member1.page.evaluate(() => localStorage.setItem('multi-member-check', 'member1'));
      const member2Value = await member2.page.evaluate(() => localStorage.getItem('multi-member-check'));
      expect(member2Value).toBeNull();
    });
  });
});
