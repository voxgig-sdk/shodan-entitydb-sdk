# ProjectName SDK exists test

import pytest
from shodanentitydb_sdk import ShodanEntitydbSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ShodanEntitydbSDK.test(None, None)
        assert testsdk is not None
