# ShodanEntitydb SDK feature factory

from feature.base_feature import ShodanEntitydbBaseFeature
from feature.test_feature import ShodanEntitydbTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ShodanEntitydbBaseFeature(),
        "test": lambda: ShodanEntitydbTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
