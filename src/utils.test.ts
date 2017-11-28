import { should } from "fuse-test-runner";
import { sum } from './index';
export class UtilsTest {
    "Should calculate sum correctly"() {
        should(sum(1, 2))
            .beNumber()
            .equal(3);
    }

    "Should not yeild strings"() {
        should().throwException(() =>
            sum("1", 2)
        );
    }

    "Should not yeild undefined values"() {
        should().throwException(() =>
            sum("1", undefined)
        );
    }

    "Should not yeild empty values"() {
        should().throwException(() =>
            sum()
        );
    }
}