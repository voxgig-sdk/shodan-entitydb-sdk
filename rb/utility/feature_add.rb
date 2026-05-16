# ShodanEntitydb SDK utility: feature_add
module ShodanEntitydbUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
