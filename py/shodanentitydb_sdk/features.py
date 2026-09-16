# ShodanEntitydb SDK feature factory

from shodanentitydb_sdk.feature.base_feature import ShodanEntitydbBaseFeature
from shodanentitydb_sdk.feature.ratelimit_feature import ShodanEntitydbRatelimitFeature
from shodanentitydb_sdk.feature.retry_feature import ShodanEntitydbRetryFeature
from shodanentitydb_sdk.feature.test_feature import ShodanEntitydbTestFeature
from shodanentitydb_sdk.feature.timeout_feature import ShodanEntitydbTimeoutFeature


_FEATURES = {
    "base": lambda: ShodanEntitydbBaseFeature(),
    "ratelimit": lambda: ShodanEntitydbRatelimitFeature(),
    "retry": lambda: ShodanEntitydbRetryFeature(),
    "test": lambda: ShodanEntitydbTestFeature(),
    "timeout": lambda: ShodanEntitydbTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
